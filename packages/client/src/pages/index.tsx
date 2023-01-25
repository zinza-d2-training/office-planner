import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(
  () => import('../components/DesignBoard').then((mod) => mod.DesignBoard),
  {
    ssr: false,
  }
);

export function Index() {
  return (
    <div>
      <DynamicComponent />
    </div>
  );
}

export default Index;
