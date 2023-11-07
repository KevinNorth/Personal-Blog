export interface NavbarTreeVertex {
  id?: string;
  name?: string;
  slug?: string;
  children: NavbarTreeVertex[];
}
