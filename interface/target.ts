import {TargetCommandGroup} from "./target-command-group";

export interface Target {
  key: string;
  label: string;
  target: string;
  variables: {
    [key: string]:string;
  };
  commands: TargetCommandGroup[];
}
