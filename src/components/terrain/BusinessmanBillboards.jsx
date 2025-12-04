import { Billboard, useTexture, Text } from "@react-three/drei";

export const peopleData = [
  { 
    id: 1,
    name: "Mr. Gerard Algama",
    role: "Brand Manager",
    description: "Leading brand strategy and marketing initiatives.",
    position: [-7, 0.5, 4], 
    scale: 4,
    image: "/Terrain /brandmanager.png"
  },
  { 
    id: 2,
    name: "Mr. Havindu Wickramarathne",
    role: "Project Manager",
    description: "Overseeing project execution and delivery.",
    position: [6, 0.5, 5], 
    scale: 4,
    image: "/Terrain /Projectmanager.png"
  },
  { 
    id: 3,
    name: "Manjima TV",
    role: "Accountant",
    description: "Managing financial operations and accounting.",
    position: [2, 0.5, -7], 
    scale: 4,
    image: "/Terrain /Accountant.png"
  },
  { 
    id: 4,
    name: "Ahmed Moulana",
    role: "Chairman",
    description: "Leading the organization with strategic vision and governance.",
    position: [0, 0.5, 5], 
    scale: 4,
    image: "/Terrain /chairman.png"
  },
  { 
    id: 5,
    name: "Andrew Fernando",
    role: "Events and Entertainment Manager",
    description: "Managing events and entertainment operations.",
    position: [-10, 0.5, -6], 
    scale: 4,
    image: "/Terrain /eventsandentertainmentmanager.png"
  },
  { 
    id: 6,
    name: "Arundathi Mahakumbura",
    role: "HR Manager",
    description: "Overseeing human resources and talent management.",
    position: [8, 0.5, -4], 
    scale: 4,
    image: "/Terrain /hrmanager.png"
  },
  { 
    id: 7,
    name: "Mr. Danushka Ambalangodage",
    role: "Senior Accountant",
    description: "Managing senior financial operations and accounting.",
    position: [5, 0.5, 2.5], 
    scale: 4,
    image: "/Terrain /SeniorAccountant.png"
  },
  { 
    id: 8,
    name: "Asan Egodagamage",
    role: "Head of IT",
    description: "Leading IT infrastructure and technology initiatives.",
    position: [-5, 0.5, -2.5], 
    scale: 4,
    image: "/Terrain /headofit.png"
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
    if (onPersonClick && person) {
      onPersonClick(person);
    }
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    if (onPersonHover && person) {
      onPersonHover(person);
    }
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'default';
    if (onPersonHover) {
      onPersonHover(null);
    }
  };
  
  return (
    <>
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
      
      <Text
        position={[person.position[0], person.position[1] + person.scale * 0.65, person.position[2]]}
        fontSize={0.15}
        color="#000000"
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.02}
        outlineColor="#ffffff"
      >
        {person.name}
      </Text>
    </>
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

