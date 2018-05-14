export class 소득세Parameter {
  과세지급액: number; 
  부양가족수: number;
  지급일: Date;
}

export class 일용직소득세Parameter {
  총지급액: number; 
  근로일수: number;
}

export namespace 간이세액표 {
  export function get소득세(param: 소득세Parameter): number;
  export function get일용직소득세(param: 일용직소득세Parameter): number;
}