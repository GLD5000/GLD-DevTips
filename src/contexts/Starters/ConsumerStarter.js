import { useDataContext } from './ProviderStarter';

const { data } = useDataContext();

export default function ConsumerStarter() {
  return <div>{data}</div>;
}
