import { http, createConfig } from '@wagmi/core';
import { sepolia } from '@wagmi/core/chains';
import { injected } from '@wagmi/connectors';

export const config = createConfig({
  chains: [sepolia],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http('https://sepolia.infura.io/v3/b82549ee0df0434585606db4bcf4a521'),
  },
  ssr: false,
});
