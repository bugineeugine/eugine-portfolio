import { Still } from "remotion";
import { AiAgents } from "./AiAgents";
import { Orchestrators } from "./Orchestrators";
import { DevTeams } from "./DevTeams";

// One still per portfolio project thumbnail, 16:9 to match the project cards.
export const RemotionRoot = () => (
  <>
    <Still id="AiAgents" component={AiAgents} width={1600} height={900} />
    <Still id="Orchestrators" component={Orchestrators} width={1600} height={900} />
    <Still id="DevTeams" component={DevTeams} width={1600} height={900} />
  </>
);
