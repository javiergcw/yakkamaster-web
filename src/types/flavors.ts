export enum Flavor {
  SPORT = 'sport',
  LABOUR = 'labour',
  HOSPITALITY = 'hospitality'
}

export interface FlavorConfig {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  buttonHoverColor: string;
  title: string;
  subtitle: string;
  welcomeText: string;
}

export const flavorConfigs: Record<Flavor, FlavorConfig> = {
  [Flavor.SPORT]: {
    name: 'Sport',
    primaryColor: '#FF6B35', // Naranja vibrante
    secondaryColor: '#004E89', // Azul deportivo
    accentColor: '#FFD23F', // Amarillo energético
    backgroundColor: '#F8F9FA',
    textColor: '#2C3E50',
    buttonColor: '#FF6B35',
    buttonHoverColor: '#E55A2B',
    title: 'Yakka Sport',
    subtitle: 'Potencia tu rendimiento deportivo',
    welcomeText: '¡Bienvenido al mundo del deporte! Conecta con atletas, entrena y alcanza tus metas.'
  },
  [Flavor.LABOUR]: {
    name: 'Labour',
    primaryColor: '#2E7D32', // Verde industrial
    secondaryColor: '#1976D2', // Azul profesional
    accentColor: '#FFC107', // Amarillo seguridad
    backgroundColor: '#FAFAFA',
    textColor: '#212121',
    buttonColor: '#2E7D32',
    buttonHoverColor: '#1B5E20',
    title: 'Yakka Labour',
    subtitle: 'Conecta con oportunidades laborales',
    welcomeText: '¡Bienvenido al mundo laboral! Encuentra trabajo, conecta con empleadores y desarrolla tu carrera.'
  },
  [Flavor.HOSPITALITY]: {
    name: 'Hospitality',
    primaryColor: '#7B1FA2', // Púrpura elegante
    secondaryColor: '#D32F2F', // Rojo hospitalario
    accentColor: '#FF9800', // Naranja cálido
    backgroundColor: '#FFF8E1',
    textColor: '#3E2723',
    buttonColor: '#7B1FA2',
    buttonHoverColor: '#6A1B9A',
    title: 'Yakka Hospitality',
    subtitle: 'Experiencias de servicio excepcionales',
    welcomeText: '¡Bienvenido al mundo de la hospitalidad! Conecta con huéspedes, crea experiencias únicas y brinda servicio de excelencia.'
  }
};
