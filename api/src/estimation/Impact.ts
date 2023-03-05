export class Impact {
  private readonly _gC02eq: number | undefined = undefined;
  private readonly _formula: string | undefined = undefined;
  private readonly _children: Map<string, Impact>;

  constructor(gC02eq?: number, formula?: string ) {
    if ((gC02eq === undefined && formula === undefined) || (gC02eq !== undefined && formula !== undefined)) {
      this._gC02eq = gC02eq;
      this._formula = formula;
      this._children = new Map<string, Impact>();
    }
    else {
      throw new Error("Either both constructor arguments are required or none.")
    }
  }

  get gC02eq(): number {
    if (this._gC02eq !== undefined) {
      return this._gC02eq;
    } else {
      let sum = 0;
      for (let value of this._children.values()) {
        if (value) {
          sum += value.gC02eq;
        }
      }
      return sum;
    }
  }

  get formula(): string {
    return this._formula ? this._formula : "";
  }

  add(key: string, impact: Impact): void {
    if (this._gC02eq === undefined) {
      this._children.set(key, impact);
    } else {
      throw new Error("can not add to leaf impact");
    }
  }

  print(key: string, parentGC02eq: number = 0): string {
    let lines:string[] = [];
    let childPercentage = parentGC02eq === 0 ? 1 : this.gC02eq / parentGC02eq;
    lines.push(`${key},${this.gC02eq.toFixed()},${(childPercentage * 100).toFixed()}%,${this.formula}`);
    for (let [childKey, value] of this._children) {
      if (value) {
        lines.push(value.print(`${key} > ${childKey}`, this.gC02eq));
      }
    }
    return lines.join("\n");
  }

  get(key: string) {
    return this._children.get(key);
  }
}
