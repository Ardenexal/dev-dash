import {CommandArgument} from "./command-argument";

export interface Command {
  key: string;
  label: string;
  command: string;
  cwd?: string;
  arguments?: CommandArgument[];
}
