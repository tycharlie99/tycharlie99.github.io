import Page from './page/[page]/page'; // Directly reference the component above

export default function Home() {
  // Simulate passing params: { page: '1' }
  return <Page params={Promise.resolve({ page: '1' })} />;
}
