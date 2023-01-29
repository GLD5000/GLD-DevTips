import { useDataContext } from '../ProviderStarter';

const { data, setData } = useDataContext();

export default function ConsumerStarter() {
  return <div>{data}</div>;
}
