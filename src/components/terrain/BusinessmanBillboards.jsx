import { Billboard, useTexture } from "@react-three/drei";
import chairmanImg from "../../assets/person-chairman.png";
import ceoImg from "../../assets/person-ceo.png";
import ctoImg from "../../assets/person-cto.png";
import cfoImg from "../../assets/person-cfo.png";
import cooImg from "../../assets/person-coo.png";
import mdImg from "../../assets/person-md.png";
import directorImg from "../../assets/person-director.png";

export const peopleData = [
  { 
    id: 1,
    name: "Richard Morrison",
    role: "Chairman",
    description: "Founding visionary with 30+ years shaping industry standards.",
    position: [-6, 0.5, 2], 
    scale: 2.5,
    image: chairmanImg
  },
  { 
    id: 2,
    name: "Sarah Chen",
    role: "Chief Executive Officer",
    description: "Strategic leader driving global expansion and innovation.",
    position: [5, 0.3, 0], 
    scale: 2,
    image: ceoImg
  },
  { 
    id: 3,
    name: "Michael Torres",
    role: "Chief Technology Officer",
    description: "Expert in AI and distributed systems architecture.",
    position: [-3, 0.8, -4], 
    scale: 1.5,
    image: ctoImg
  },
  { 
    id: 4,
    name: "Amanda Roberts",
    role: "Chief Financial Officer",
    description: "Financial strategist overseeing global operations.",
    position: [8, 0.2, -6], 
    scale: 1.2,
    image: cfoImg
  },
  { 
    id: 5,
    name: "James Anderson",
    role: "Chief Operating Officer",
    description: "Optimizing operations for peak organizational performance.",
    position: [-10, 0.4, -8], 
    scale: 1,
    image: cooImg
  },
  { 
    id: 6,
    name: "Victoria Hayes",
    role: "Managing Director",
    description: "Leading regional initiatives and business development.",
    position: [2, 1, -10], 
    scale: 0.8,
    image: mdImg
  },
  { 
    id: 7,
    name: "Daniel Foster",
    role: "Board Director",
    description: "Ensuring governance and stakeholder value creation.",
    position: [-8, 0.6, -12], 
    scale: 0.6,
    image: directorImg
  },
];

const PersonBillboard = ({ 
  person, 
  onPersonClick, 
  onPersonHover 
}) => {
  const texture = useTexture(person.image);
  
  const handleClick = (e) => {
    e.stopPropagation();
    onPersonClick(person);
  };

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
    onPersonHover(person);
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'default';
    onPersonHover(null);
  };
  
  return (
    <Billboard
      position={person.position}
      follow={true}
      lockX={false}
      lockY={false}
      lockZ={false}
    >
      <mesh 
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <planeGeometry args={[person.scale, person.scale * 1.2]} />
        <meshBasicMaterial 
          map={texture} 
          transparent 
          alphaTest={0.5}
          depthWrite={true}
        />
      </mesh>
    </Billboard>
  );
};

export const BusinessmanBillboards = ({ onPersonClick, onPersonHover }) => {
  return (
    <>
      {peopleData.map((person) => (
        <PersonBillboard
          key={person.id}
          person={person}
          onPersonClick={onPersonClick}
          onPersonHover={onPersonHover}
        />
      ))}
    </>
  );
};

