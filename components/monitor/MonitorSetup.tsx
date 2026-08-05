'use client';

import { Html, RoundedBox } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import type { Group, PerspectiveCamera } from 'three';
import { MathUtils } from 'three';
import { DeskToolbar } from '@/components/desk/DeskToolbar';

type MonitorSetupProps = {
  children: ReactNode;
  lampOn: boolean;
  onToggleLamp: () => void;
  onDeskActivity?: () => void;
};

const beige = '#c9bea2';
const beigeLight = '#e4dbc3';
const beigeDark = '#8d8268';
const wood = '#6d351b';
const darkPlastic = '#242522';

function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const perspective = camera as PerspectiveCamera;
    const portrait = size.width / size.height < 0.82;
    perspective.position.set(0, portrait ? 5.2 : 4.7, portrait ? 18.5 : 14.2);
    perspective.fov = portrait ? 39 : 36;
    perspective.updateProjectionMatrix();
    perspective.lookAt(0, 1.65, 0);
  }, [camera, size]);

  return null;
}

function PixelLetter({
  letter,
  position,
}: {
  letter: 'B' | 'I' | 'Z';
  position: [number, number, number];
}) {
  const patterns = {
    B: ['1110', '1001', '1110', '1001', '1110'],
    I: ['111', '010', '010', '010', '111'],
    Z: ['1111', '0010', '0100', '1000', '1111'],
  };
  const cells = patterns[letter];

  return (
    <group position={position}>
      {cells.flatMap((row, y) =>
        Array.from(row).map((cell, x) =>
          cell === '1' ? (
            <mesh key={`${x}-${y}`} position={[x * 0.13, -y * 0.13, 0]} castShadow>
              <boxGeometry args={[0.11, 0.11, 0.055]} />
              <meshStandardMaterial color="#f4a62a" roughness={0.5} />
            </mesh>
          ) : null
        )
      )}
    </group>
  );
}

function WallDetails() {
  return (
    <group>
      <RoundedBox args={[3.25, 1.45, 0.1]} radius={0.04} position={[-5.25, 5.05, -1.84]}>
        <meshStandardMaterial color="#183d58" roughness={0.9} />
      </RoundedBox>
      <group position={[-6.05, 5.34, -1.76]} scale={1.24}>
        <PixelLetter letter="B" position={[0, 0, 0]} />
        <PixelLetter letter="I" position={[0.72, 0, 0]} />
        <PixelLetter letter="Z" position={[1.22, 0, 0]} />
      </group>
      <mesh position={[5.4, 5.0, -1.82]}>
        <boxGeometry args={[2.35, 1.65, 0.08]} />
        <meshStandardMaterial color="#d4c39b" roughness={0.92} />
      </mesh>
      <mesh position={[5.4, 5.18, -1.75]}>
        <circleGeometry args={[0.54, 32]} />
        <meshStandardMaterial color="#db563b" roughness={0.78} />
      </mesh>
      <mesh position={[5.4, 4.83, -1.69]}>
        <boxGeometry args={[1.55, 0.16, 0.05]} />
        <meshStandardMaterial color="#263849" />
      </mesh>

      <group position={[7.05, 3.05, -1.68]}>
        <mesh castShadow>
          <boxGeometry args={[0.48, 0.8, 0.15]} />
          <meshStandardMaterial color="#e9e4d7" roughness={0.78} />
        </mesh>
        <mesh position={[0, 0.13, 0.09]} rotation={[0.22, 0, 0]}>
          <boxGeometry args={[0.14, 0.28, 0.06]} />
          <meshStandardMaterial color="#b4aa91" />
        </mesh>
        <mesh position={[0, -0.25, 0.09]}>
          <circleGeometry args={[0.035, 16]} />
          <meshStandardMaterial color="#767066" />
        </mesh>
      </group>
    </group>
  );
}

function Speaker({ x }: { x: number }) {
  return (
    <group position={[x, 2.08, 0.12]} rotation={[0, x < 0 ? 0.09 : -0.09, 0]}>
      <RoundedBox args={[1.15, 2.4, 1.05]} radius={0.1} castShadow receiveShadow>
        <meshStandardMaterial color={beige} roughness={0.72} />
      </RoundedBox>
      {[0.47, -0.43].map((y, index) => (
        <group key={y} position={[0, y, 0.55]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[index ? 0.36 : 0.25, index ? 0.36 : 0.25, 0.08, 32]} />
            <meshStandardMaterial color="#2d302e" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[index ? 0.16 : 0.09, index ? 0.16 : 0.09, 0.04, 24]} />
            <meshStandardMaterial color="#171817" roughness={0.6} />
          </mesh>
        </group>
      ))}
      <mesh position={[0.35, -0.93, 0.58]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial color="#e56532" emissive="#8c250e" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

function ComputerTower() {
  return (
    <group position={[-6.65, 1.7, -0.05]} rotation={[0, 0.08, 0]}>
      <RoundedBox args={[2.0, 3.9, 1.85]} radius={0.1} castShadow receiveShadow>
        <meshStandardMaterial color={beige} roughness={0.74} />
      </RoundedBox>
      <mesh position={[0, 1.25, 0.95]}>
        <boxGeometry args={[1.38, 0.12, 0.07]} />
        <meshStandardMaterial color="#4b4a43" />
      </mesh>
      <mesh position={[0, 0.72, 0.97]}>
        <boxGeometry args={[1.45, 0.42, 0.08]} />
        <meshStandardMaterial color={beigeDark} roughness={0.82} />
      </mesh>
      <mesh position={[-0.42, -1.34, 0.97]}>
        <cylinderGeometry args={[0.12, 0.12, 0.06, 24]} />
        <meshStandardMaterial color="#30322f" />
      </mesh>
      <mesh position={[-0.06, -1.34, 1.0]}>
        <sphereGeometry args={[0.045, 14, 14]} />
        <meshStandardMaterial color="#57b570" emissive="#26863f" emissiveIntensity={1.2} />
      </mesh>
      {[-0.42, -0.14, 0.14, 0.42].map((x) => (
        <mesh key={x} position={[x, -0.72, 0.98]}>
          <boxGeometry args={[0.16, 0.035, 0.04]} />
          <meshStandardMaterial color="#766d59" />
        </mesh>
      ))}
    </group>
  );
}

function Printer() {
  return (
    <group position={[6.45, 1.38, -0.1]} rotation={[0, -0.09, 0]}>
      <RoundedBox args={[2.85, 1.55, 2.0]} radius={0.12} castShadow receiveShadow>
        <meshStandardMaterial color={beigeLight} roughness={0.76} />
      </RoundedBox>
      <mesh position={[0, 0.65, 0.25]} rotation={[-0.35, 0, 0]} castShadow>
        <boxGeometry args={[2.3, 0.18, 1.1]} />
        <meshStandardMaterial color={beigeDark} roughness={0.82} />
      </mesh>
      <mesh position={[0, 1.53, 0]} rotation={[-0.16, 0, 0]}>
        <planeGeometry args={[2.08, 2.2]} />
        <meshStandardMaterial color="#eee9cf" roughness={0.95} side={2} />
      </mesh>
      {[-0.6, -0.3, 0, 0.3, 0.6].map((y) => (
        <mesh key={y} position={[0, 1.53 + y * 0.25, 0.02]} rotation={[-0.16, 0, 0]}>
          <boxGeometry args={[1.55, 0.025, 0.012]} />
          <meshStandardMaterial color="#71808a" />
        </mesh>
      ))}
      <mesh position={[0, 0.28, 1.04]}>
        <boxGeometry args={[2.2, 0.3, 0.08]} />
        <meshStandardMaterial color="#343633" />
      </mesh>
    </group>
  );
}

function DeskLamp({ lampOn }: { lampOn: boolean }) {
  return (
    <group position={[-4.85, 2.0, 1.15]} rotation={[0, 0.16, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.72, 0.82, 0.18, 32]} />
        <meshStandardMaterial color="#304b42" metalness={0.45} roughness={0.42} />
      </mesh>
      <mesh position={[0, 1.12, 0]} rotation={[0, 0, -0.28]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 2.35, 16]} />
        <meshStandardMaterial color="#384d46" metalness={0.5} roughness={0.34} />
      </mesh>
      <group position={[-0.7, 2.18, 0]} rotation={[0, 0, -0.12]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <coneGeometry args={[0.72, 0.9, 32, 1, true]} />
          <meshStandardMaterial color="#365f50" metalness={0.38} roughness={0.42} side={2} />
        </mesh>
        <mesh position={[0, -0.33, 0]}>
          <sphereGeometry args={[0.25, 20, 20]} />
          <meshStandardMaterial
            color={lampOn ? '#fff2b4' : '#716c5a'}
            emissive={lampOn ? '#ffd66a' : '#000000'}
            emissiveIntensity={lampOn ? 2.8 : 0}
          />
        </mesh>
        {lampOn ? (
          <pointLight
            position={[0, -0.45, 0.15]}
            color="#ffd898"
            intensity={32}
            distance={10}
            decay={2}
            castShadow
            shadow-mapSize={[512, 512]}
          />
        ) : null}
      </group>
    </group>
  );
}

function Keyboard() {
  const keyRows = useMemo(
    () => [
      { count: 15, width: 0.34, offset: 0 },
      { count: 14, width: 0.38, offset: 0.08 },
      { count: 13, width: 0.4, offset: 0.18 },
      { count: 12, width: 0.42, offset: 0.28 },
      { count: 8, width: 0.48, offset: 0.55 },
    ],
    []
  );

  return (
    <group position={[0.25, 0.66, 3.0]} rotation={[-0.05, 0, 0]}>
      <RoundedBox args={[6.65, 0.38, 2.28]} radius={0.14} castShadow receiveShadow>
        <meshStandardMaterial color={beige} roughness={0.78} />
      </RoundedBox>
      {keyRows.flatMap((row, rowIndex) =>
        Array.from({ length: row.count }, (_, index) => {
          const total = (row.count - 1) * row.width;
          return (
            <RoundedBox
              key={`${rowIndex}-${index}`}
              args={[row.width * 0.78, 0.14, 0.3]}
              radius={0.025}
              position={[
                -total / 2 + index * row.width + row.offset,
                0.25,
                -0.76 + rowIndex * 0.37,
              ]}
              castShadow
            >
              <meshStandardMaterial
                color={rowIndex === 0 ? '#8f8978' : beigeLight}
                roughness={0.82}
              />
            </RoundedBox>
          );
        })
      )}
      <RoundedBox args={[2.25, 0.14, 0.3]} radius={0.025} position={[0, 0.25, 0.74]} castShadow>
        <meshStandardMaterial color={beigeLight} roughness={0.82} />
      </RoundedBox>
    </group>
  );
}

function Mouse() {
  return (
    <group position={[4.15, 0.72, 3.25]} rotation={[0.02, -0.15, 0]}>
      <mesh castShadow>
        <sphereGeometry args={[0.52, 24, 18]} />
        <meshStandardMaterial color={beigeLight} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.35, 0.02]}>
        <boxGeometry args={[0.03, 0.08, 0.7]} />
        <meshStandardMaterial color="#6c675a" />
      </mesh>
      <mesh position={[0, 0.45, -0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.13, 18]} />
        <meshStandardMaterial color="#42423d" roughness={0.8} />
      </mesh>
      <mesh position={[0.1, -0.22, -0.55]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.018, 8, 32, 1.1]} />
        <meshStandardMaterial color="#252621" />
      </mesh>
    </group>
  );
}

function DeskClutter() {
  return (
    <group>
      <group position={[5.05, 0.92, 2.25]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.4, 0.43, 0.82, 32]} />
          <meshStandardMaterial color="#ba4839" roughness={0.68} />
        </mesh>
        <mesh position={[0.48, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.28, 0.08, 12, 24]} />
          <meshStandardMaterial color="#ba4839" roughness={0.68} />
        </mesh>
        <mesh position={[0, 0.42, 0]}>
          <torusGeometry args={[0.31, 0.055, 10, 30]} />
          <meshStandardMaterial color="#802b24" />
        </mesh>
      </group>
      {[0, 1, 2].map((i) => (
        <group
          key={i}
          position={[-3.58 + i * 0.18, 0.58 + i * 0.055, 2.68 + i * 0.12]}
          rotation={[0, 0.45 - i * 0.14, 0]}
        >
          <mesh castShadow>
            <boxGeometry args={[0.95, 0.08, 0.98]} />
            <meshStandardMaterial color={i === 1 ? '#cf5a32' : '#344b61'} roughness={0.72} />
          </mesh>
          <mesh position={[0, 0.05, 0.12]}>
            <boxGeometry args={[0.56, 0.025, 0.25]} />
            <meshStandardMaterial color="#d8d2bd" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function CRTMonitor({
  children,
  onDeskActivity,
}: {
  children: ReactNode;
  onDeskActivity?: () => void;
}) {
  return (
    <group position={[0, 2.65, 0]}>
      <RoundedBox args={[6.45, 5.05, 2.65]} radius={0.24} castShadow receiveShadow>
        <meshStandardMaterial color={beige} roughness={0.68} />
      </RoundedBox>
      <RoundedBox args={[5.05, 3.88, 0.22]} radius={0.2} position={[0, 0.28, 1.39]} castShadow>
        <meshStandardMaterial color="#171a18" roughness={0.42} />
      </RoundedBox>
      <mesh position={[0, 0.28, 1.515]}>
        <planeGeometry args={[4.45, 3.34]} />
        <meshStandardMaterial color="#030706" emissive="#183c43" emissiveIntensity={0.28} />
      </mesh>
      <Html
        center
        position={[0.12, 0.03, 1.54]}
        distanceFactor={5.5}
        zIndexRange={[30, 0]}
        style={{ pointerEvents: 'auto' }}
      >
        <div className="crt-html-screen" onPointerDown={onDeskActivity}>
          {children}
          <div className="crt-screen-glass" aria-hidden />
        </div>
      </Html>
      <group position={[-2.42, 2.05, 1.4]} scale={0.48}>
        <PixelLetter letter="B" position={[0, 0, 0]} />
        <PixelLetter letter="I" position={[0.66, 0, 0]} />
        <PixelLetter letter="Z" position={[1.05, 0, 0]} />
      </group>
      <mesh position={[1.94, -2.03, 1.43]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 24]} />
        <meshStandardMaterial color="#4b4c46" metalness={0.2} roughness={0.58} />
      </mesh>
      <mesh position={[2.25, -2.03, 1.46]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial color="#70c675" emissive="#349d45" emissiveIntensity={1.8} />
      </mesh>
      <mesh position={[0, -2.76, 0.05]} castShadow>
        <cylinderGeometry args={[0.9, 1.18, 0.55, 32]} />
        <meshStandardMaterial color={beigeDark} roughness={0.74} />
      </mesh>
      <RoundedBox args={[3.2, 0.34, 1.8]} radius={0.18} position={[0, -3.05, 0.08]} castShadow>
        <meshStandardMaterial color={beige} roughness={0.76} />
      </RoundedBox>
    </group>
  );
}

function RoomScene({
  children,
  lampOn,
  onDeskActivity,
}: {
  children: ReactNode;
  lampOn: boolean;
  onDeskActivity?: () => void;
}) {
  const rig = useRef<Group>(null);

  useFrame(({ pointer }) => {
    if (!rig.current) return;
    rig.current.rotation.y = MathUtils.lerp(rig.current.rotation.y, pointer.x * 0.018, 0.035);
    rig.current.rotation.x = MathUtils.lerp(rig.current.rotation.x, -pointer.y * 0.008, 0.035);
  });

  return (
    <>
      <ResponsiveCamera />
      <color attach="background" args={[lampOn ? '#9c9385' : '#171a1c']} />
      <fog attach="fog" args={[lampOn ? '#9c9385' : '#171a1c', 15, 31]} />
      <hemisphereLight args={[lampOn ? '#dbe6ef' : '#506077', '#3b261b', lampOn ? 1.55 : 0.3]} />
      <directionalLight
        position={[3, 9, 7]}
        intensity={lampOn ? 2.5 : 0.45}
        color="#e8f0ff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={11}
        shadow-camera-bottom={-6}
      />
      <pointLight position={[0, 3.1, 3]} color="#77c9db" intensity={lampOn ? 4 : 7} distance={8} />

      <group ref={rig}>
        <mesh position={[0, 3.25, -1.95]} receiveShadow>
          <boxGeometry args={[18, 10.5, 0.25]} />
          <meshStandardMaterial color={lampOn ? '#afa99d' : '#36393b'} roughness={0.96} />
        </mesh>
        <mesh position={[0, -0.18, 2.2]} receiveShadow>
          <boxGeometry args={[17.5, 0.55, 8.1]} />
          <meshStandardMaterial color={wood} roughness={0.62} />
        </mesh>
        <mesh position={[0, -0.49, 2.2]} receiveShadow>
          <boxGeometry args={[17.8, 0.14, 8.25]} />
          <meshStandardMaterial color="#3e1b0e" roughness={0.7} />
        </mesh>
        {[-7.4, 7.4].map((x) => (
          <mesh key={x} position={[x, -2.65, 2.2]} castShadow>
            <boxGeometry args={[0.65, 4.5, 5.8]} />
            <meshStandardMaterial color="#4f2615" roughness={0.68} />
          </mesh>
        ))}

        <WallDetails />
        <ComputerTower />
        <Speaker x={-4.05} />
        <Speaker x={4.05} />
        <Printer />
        <DeskLamp lampOn={lampOn} />
        <CRTMonitor onDeskActivity={onDeskActivity}>{children}</CRTMonitor>
        <Keyboard />
        <Mouse />
        <DeskClutter />
      </group>
    </>
  );
}

export function MonitorSetup({ children, lampOn, onToggleLamp, onDeskActivity }: MonitorSetupProps) {
  return (
    <main className={`biz-room ${lampOn ? 'biz-room-lit' : 'biz-room-dark'}`}>
      <div className="biz-canvas" aria-label="Interactive BIZ retro computer room">
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, 4.7, 14.2], fov: 36, near: 0.1, far: 60 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          onPointerDown={onDeskActivity}
        >
          <Suspense fallback={null}>
            <RoomScene lampOn={lampOn} onDeskActivity={onDeskActivity}>
              {children}
            </RoomScene>
          </Suspense>
        </Canvas>
      </div>
      <DeskToolbar lightsOn={lampOn} onToggleLights={onToggleLamp} />
      <div className="biz-room-vignette" aria-hidden />
    </main>
  );
}
