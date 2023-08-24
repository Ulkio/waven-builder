export interface Build {
  compagnons: Compagnon[] | [];
  anneaux: Anneau[] | [];
  brassard: Brassard | null;
  sorts: Sort[] | [];
  arme: Arme | null;
  passifs: Passif[] | [];
}

export interface Root {
  compagnons: Compagnons;
  sorts: Sorts;
  armes: Armes;
  anneaux: Anneaux;
  brassard: Brassard;
}

export interface Compagnons {
  compagnons: Compagnon[] | [];
}

export interface Compagnon {
  nom: string;
  rarete: string;
  image: string;
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
  cout: number;
  effet: string;
  sort?: string;
}

export interface Couts {
  [element: string]: number;
  // feu?: number;
  // air?: number;
  // terre?: number;
  // eau?: number;
}

export interface Anneau {
  nom: string;
  rarete: string;
  image: string;
  patchs: PatchAnneaux[];
}
export interface Anneaux {
  anneau1: Anneau | null;
  anneau2: Anneau | null;
  anneau3: Anneau | null;
  anneau4: Anneau | null;
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
  cout: number;
  effet: string;
  sort: string;
}

export interface Brassard {
  nom: string;
  rarete: string;
  image: string;
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
  cout: number;
  effet: string;
  sort?: string;
}

export interface Sorts {
  sorts: Sort[];
}

export interface Sort {
  nom: string;
  element: string;
  source: string;
  dieu: string;
  arme?: string;
  image: string;
  patchs: PatchSorts[];
}
export interface PatchSorts {
  version: string;
  cout: number;
  effet: string;
  dons?: DonSorts[];
  gains?: Gains;
}

export interface DonSorts {
  nom: string;
  cout: number;
  effet: string;
}

export interface Gains {
  feu?: number;
  air?: number;
  terre?: number;
  astral?: number;
  eau?: number;
  neutre?: number;
}
export interface Armes {
  armes: Arme[];
}

export interface Arme {
  nom: string;
  dieu: string;
  image: string;
  patchs: PatchArmes[];
}
export interface PatchArmes {
  version: string;
  effet: string;
  passifs: Passif[];
  pv: number;
  at: number;
  cc: number;
  pm: number;
}
export interface Passif {
  nom: string;
  image: string;
  effet: string;
}
export interface PassifValues {
  pv_50: number;
  pv_25: number;
  pv_12: number;
  pv_5: number;
  at_50: number;
  at_20: number;
  at_7: number;
  at_3: number;
}
export interface BuildItemProps {
  item: Brassard | Anneau;
  squareVariants: string;
  openModal: () => void;
  size?: number;
}
export interface BuildCompagnonProps {
  item: Compagnon;
  companionSquareVariants: string;
  emptyCompanionVariants: string;
  openModal: () => void;
  index: number;
  size?: number;
}
export interface BuildSortProps {
  item: Sort;
  spellSquareVariants: string;
  openModal: () => void;
  index: number;
  size?: number;
}
export interface BuildArmeProps {
  build: Build;
  item: Arme;
  openModal: () => void;
  size?: number;
  onSelectedPassifChange: (passif: Passif) => void;
  onLevelChange: (level: number) => void;
  buildPassifs: Passif[];
  isImported: boolean;
}
