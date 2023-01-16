import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() =>
  import('../components/SeatPlanner').then((mod) => mod.SeatPlanner), {
    ssr: false,
  }
)

export function Index() {
  return (
    <div>
      <DynamicComponent/>
    </div>
  );
}

export default Index;
