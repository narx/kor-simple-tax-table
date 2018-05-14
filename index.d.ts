export namespace 간이세액표 {
  export function get소득세({과세지급액: number, 부양가족수: number, 지급일: Date}): number;
  export function get일용직소득세({ 총지급액: number, 근로일수: number }): number;
}