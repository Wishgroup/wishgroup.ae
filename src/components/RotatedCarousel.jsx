import React, { useState } from "react";

// RotatedCarousel.jsx
// A vertical carousel component with rotated layout

export default function RotatedCarousel({ items = ["1","2","3","4","5"] }) {
  // initial positions for a 5-item carousel: -2, -1, 0, 1, 2
  const initial = items.map((label, i) => ({
    id: i,
    label,
    pos: (i - 2).toString(), // '-2' .. '2'
  }));

  const [elems, setElems] = useState(initial);

  const getPos = (current, active) => {
    const cur = Number(current);
    const act = Number(active);
    const diff = cur - act;

    if (Math.abs(diff) > 2) {
      return (-cur).toString();
    }

    return diff.toString();
  };

  const update = (clickedPos) => {
    setElems((prev) => {
      return prev.map((item) => ({
        ...item,
        pos: getPos(item.pos, clickedPos),
      }));
    });
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* 
        We rotate the entire carousel -90deg by applying transform to this wrapper.
        Each item inner content is rotated +90deg so numbers/text remain upright.
      */}
      <div
        className="rotated-carousel-wrapper"
        style={{
          width: 600,
          height: 600,
          transform: "rotate(-90deg)",
          // keep 3D perspective like the original
          perspective: "1000px",
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ul
          className="rotated-carousel-list"
          style={{
            position: 'absolute',
            inset: 0,
            margin: 0,
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 500,
          }}
        >
          {elems.map((item, idx) => {
            const pos = item.pos; // string like '-2','-1','0','1','2'

            // compute classes and inline styles similar to your CSS rules
            let baseStyle = {
              width: 250,
              height: 400,
              borderRadius: 20,
              boxShadow: "0 4px 16px rgba(50,50,50,0.5)",
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all .3s ease-in",
              transformOrigin: "center",
            };

            let extra = {};
            let zIndex = 1;
            let opacity = 1;
            let filter = "none";

            switch (pos) {
              case "0":
                zIndex = 5;
                break;
              case "-1":
                extra.transform = "translateX(-40%) scale(.9)";
                zIndex = 4;
                opacity = 0.7;
                filter = "blur(1px) grayscale(10%)";
                break;
              case "1":
                extra.transform = "translateX(40%) scale(.9)";
                zIndex = 4;
                opacity = 0.7;
                filter = "blur(1px) grayscale(10%)";
                break;
              case "-2":
                extra.transform = "translateX(-70%) scale(.8)";
                zIndex = 3;
                opacity = 0.4;
                filter = "blur(3px) grayscale(20%)";
                break;
              case "2":
                extra.transform = "translateX(70%) scale(.8)";
                zIndex = 3;
                opacity = 0.4;
                filter = "blur(3px) grayscale(20%)";
                break;
              default:
                break;
            }

            // pick a gradient based on idx (replicates your nth-child colors)
            const gradients = [
              "linear-gradient(45deg,#2D35EB 0%,#904ED4 100%)",
              "linear-gradient(45deg,#2D35EB 0%,#fdbb2d 100%)",
              "linear-gradient(45deg,#2D35EB 0%,#22c1c3 100%)",
              "linear-gradient(45deg,#fdbb2d 0%,#904ED4 100%)",
              "linear-gradient(45deg,#22c1c3 0%,#904ED4 100%)",
            ];

            const style = {
              ...baseStyle,
              ...extra,
              zIndex,
              opacity,
              filter,
              background: gradients[idx % gradients.length],
              cursor: "pointer",
            };

            return (
              <li
                key={item.id}
                onClick={() => update(item.pos)}
                role="button"
                aria-pressed={item.pos === "0"}
                style={style}
                data-pos={item.pos}
                className="rotated-carousel-item"
              >
                {/* rotate the content back so it reads upright despite the wrapper rotation */}
                <div style={{ transform: "rotate(90deg)", fontSize: 48, color: "#fff", fontFamily: "Arial", fontWeight: "bold" }}>
                  {item.label}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

