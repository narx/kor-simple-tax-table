export namespace korSimpleTaxTable {
  export function getTax({salary: number, family: number, date: Date}): number;
  export function get일용직소득세({ 지급액: number, 근로일: number }): number;
}