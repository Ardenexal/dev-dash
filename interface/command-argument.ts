export interface CommandArgument {
  name: string;
  default: string;
  type: 'argument' | 'flag' | 'option';

}
