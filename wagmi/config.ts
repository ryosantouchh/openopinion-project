import { http, createConfig } from "wagmi";
import { worldchainSepolia } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [worldchainSepolia],
  transports: {
    [worldchainSepolia.id]: http(),
  },
});
