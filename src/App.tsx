import html2canvas from "html2canvas";
import { FormEvent, Ref, useRef, useState } from "react";
import { TwitterPicker } from "react-color";
import jsPdf from "jspdf";

import dog from "./assets/3.png";

function App() {
  const options = [
    "Two lines with image",
    "Single line and image",
    "Two lines no image",
    "Single line and no image",
  ];

  const Colors = ["#fff", "#2c5cc4", "#f10d92", "#eafa0e"];

  const [option, setOption] = useState<string>(options[0]);
  const [color, setColor] = useState<string>(Colors[2]);

  const [firstline, setFirstLine] = useState<string>("John smith");
  const [secondLine, setSecondLine] = useState<string>("Room 100");

  const ref = useRef<HTMLDivElement>(null);

  const renderSwitch = (option: string, bg: string) => {
    switch (option) {
      case "Two lines with image":
        return (
          <div
            id="main"
            ref={ref}
            style={{
              backgroundColor: bg,
            }}
            className="card"
          >
            <div>
              <h2 className="card-header">{firstline}</h2>
              <p className="card-paragraph">{secondLine}</p>
            </div>
            <img className="card-img" src={dog} />
          </div>
        );
      case "Single line and image":
        return (
          <div
            style={{
              backgroundColor: bg,
            }}
            className="card"
          >
            <div>
              <h2 className="card-header">{firstline}</h2>
            </div>
            <img className="card-img" src={dog} />
          </div>
        );
      case "Two lines no image":
        return (
          <div
            style={{
              backgroundColor: bg,
            }}
            className="card text-center flex flex-col items-center justify-center"
          >
            <div>
              <h2 className="card-header">{firstline}</h2>
              <p className="card-paragraph">{secondLine}</p>
            </div>
          </div>
        );
      case "Single line and no image":
        return (
          <div
            style={{
              backgroundColor: bg,
            }}
            className="card text-center flex flex-col items-center justify-center"
          >
            <div className="">
              <h2 className="card-header">{firstline}</h2>
            </div>
          </div>
        );
      default:
        return (
          <div
            style={{
              backgroundColor: bg,
            }}
            className="card"
          >
            <div>
              <h2>John smith</h2>
              <p>{secondLine}</p>
            </div>
            <img className="card-img" src={dog} />
          </div>
        );
    }
  };

  const onSubmit = (event: FormEvent, ref: Ref<HTMLDivElement>) => {
    event.preventDefault();
    const main = document.getElementById("main");
    const doc = new jsPdf();

    main &&
      html2canvas(main).then((canvas) => {
        const canvasUrl = canvas.toDataURL("image/jpeg");
        doc.addImage(canvasUrl, "JPEG", 15, 40, 180, 180);
        doc.save(`test${Math.random()}.pdf`);
      });
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <h1 className="text-4xl font-bold">ProtoType</h1>
      <select
        className="appearance-none outline-none text-center	bg-white my-4 border px-4 py-1 rounded-md bg-black text-white"
        value={option}
        onChange={(e) => setOption(e.target.value)}
      >
        {options.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>

      <TwitterPicker
        triangle="hide"
        styles={{
          default: {
            input: {
              display: "none",
            },
          },
        }}
        // colors={["#fff", "#2c5cc4", "#f10d92", "#eafa0e"]}
        color={color}
        onChangeComplete={(e) => setColor(e.hex)}
      />
      {renderSwitch(option, color)}
      <form
        className="flex flex-col  space-y-4 mt-5"
        onSubmit={(e) => onSubmit(e, ref)}
      >
        <input
          value={firstline}
          className="input"
          onChange={(e) => setFirstLine(e.target.value)}
        />
        <input
          className="input"
          value={secondLine}
          onChange={(e) => setSecondLine(e.target.value)}
        />

        <input className="btn" type="submit" value="Print sticker" />
      </form>
    </div>
  );
}

export default App;
