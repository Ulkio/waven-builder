export interface Root {
  compagnons: Compagnons;
  equipements: Equipements;
  sorts: Sorts;
}

export interface Compagnons {
  compagnons: Compagnon[];
}

export interface Compagnon {
  nom: string;
  rarete: string;
  image: string;
  iles: string[];
  patchs: PatchCompagnon[];
}

export interface PatchCompagnon {
  version: string;
  pv: number;
  at: number;
  cc: number;
  pm: number;
  effet: string;
  caracteristiques: CaracteristiqueCompagnons[];
  dons: DonCompagnons[];
  couts: Couts;
  sort?: string;
}

export interface CaracteristiqueCompagnons {
  taux: number;
  effet: string;
}

export interface DonCompagnons {
  nom: string;
  cout: any;
  effet: string;
  sort?: string;
}

export interface Couts {
  feu?: number;
  air?: number;
  terre?: number;
  eau?: number;
}

export interface Equipements {
  anneaux: Anneaux[];
  brassards: Brassard[];
}

export interface Anneaux {
  nom: string;
  rarete: string;
  image: string;
  iles: string[];
  patchs: PatchAnneaux[];
}

export interface PatchAnneaux {
  version: string;
  pouvoir: string;
  caracteristiques: CaracteristiqueAnneaux[];
  dons: DonAnneaux[];
  nom?: string;
  sort?: string;
}

export interface CaracteristiqueAnneaux {
  taux: number;
  effet: string;
}

export interface DonAnneaux {
  nom: string;
  cout: string;
  effet: string;
  sort: string;
}

export interface Brassard {
  nom: string;
  rarete: string;
  image: string;
  iles: string[];
  patchs: PatchBrassards[];
}

export interface PatchBrassards {
  version: string;
  pouvoir?: string;
  caracteristiques: CaracteristiqueBrassards[];
  dons: DonBrassards[];
  sort?: string;
}

export interface CaracteristiqueBrassards {
  taux: number;
  effet: string;
}

export interface DonBrassards {
  nom: string;
  cout: string;
  effet: string;
  sort: string;
}

export interface Sorts {
  sorts: Sort[];
}

export interface Sort {
  nom: string;
  element: string;
  source: string;
  image: string;
  patchs: PatchSorts[];
}
export interface DonSorts {
  nom: string;
  cout: string;
  effet: string;
  sort: string;
}
export interface PatchSorts {
  version: string;
  cout: number;
  effet: string;
  dons: any[];
  gains: Gains;
}

export interface Gains {
  feu?: number;
  air?: number;
  terre?: number;
  ether?: number;
  eau?: number;
  neutre?: number;
}
