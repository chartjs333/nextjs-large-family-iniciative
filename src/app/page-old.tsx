import ClientOnly from '../components/ClientOnly';
import MainApp from '../components/MainApp';

export default function Home() {
    return (
    <ClientOnly>
      <MainApp />
    </ClientOnly>
    );
}