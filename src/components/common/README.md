# Sistema de Barra de Progreso Dinámica

## Descripción
Este sistema implementa una barra de progreso que cambia de color dinámicamente según el "flavor" (tipo de trabajador) seleccionado en la aplicación YAKKA.

## Componentes

### 1. ProgressBar
**Ubicación:** `src/components/common/ProgressBar.tsx`

Componente que renderiza la barra de progreso en la parte inferior de la pantalla.

**Props:**
- `currentStep`: Número del paso actual (1-based)
- `totalSteps`: Número total de pasos
- `flavor`: Tipo de flavor (SPORT, LABOUR, HOSPITALITY)
- `height`: Altura de la barra (opcional, default: 4px)

**Características:**
- Posición fija en la parte inferior
- Color dinámico según el flavor
- Transición suave al cambiar de paso
- Z-index alto para estar siempre visible

### 2. FlavorSelector
**Ubicación:** `src/components/common/FlavorSelector.tsx`

Componente que permite cambiar entre diferentes flavors para probar el sistema.

**Props:**
- `currentFlavor`: Flavor actualmente seleccionado
- `onFlavorChange`: Función callback para cambiar el flavor

### 3. useJobForm Hook
**Ubicación:** `src/hooks/useJobForm.ts`

Hook personalizado que maneja el estado del formulario y la navegación entre pasos.

**Funcionalidades:**
- Gestión del estado del formulario
- Navegación entre pasos (siguiente/anterior)
- Validación de pasos
- Reset del formulario

## Colores por Flavor

### SPORT (Deportes)
- Color primario: `#FF6B35` (Naranja)
- Color hover: `#E55A2B`

### LABOUR (Trabajo)
- Color primario: `#2E7D32` (Verde)
- Color hover: `#1B5E20`

### HOSPITALITY (Hospitalidad)
- Color primario: `#7B1FA2` (Morado)
- Color hover: `#6A1B9A`

## Flujo de Pasos

1. **JobsiteSelector** - Selección de sitio de trabajo
2. **WorkerTypeSelector** - Tipo de trabajador
3. **WorkerQuantitySelector** - Cantidad de trabajadores
4. **LabourCostCalculator** - Calculadora de costos
5. **JobDateSelector** - Fecha del trabajo
6. **JobTimeTypeSelector** - Tipo de tiempo
7. **JobRequirementsSelector** - Requisitos del trabajo
8. **PaymentDateSelector** - Fecha de pago
9. **SupervisorSelector** - Supervisor
10. **JobReviewSelector** - Revisión final

## Uso

```tsx
import ProgressBar from '@/components/common/ProgressBar';
import { useJobForm } from '@/hooks/useJobForm';

function MyComponent() {
  const { currentStepIndex, totalSteps, goToNextStep } = useJobForm(Flavor.LABOUR);
  
  return (
    <>
      {/* Tu contenido aquí */}
      <ProgressBar
        currentStep={currentStepIndex + 1}
        totalSteps={totalSteps}
        flavor={Flavor.LABOUR}
      />
    </>
  );
}
```

## Características Técnicas

- **Responsive**: Se adapta a diferentes tamaños de pantalla
- **Accesible**: Cumple con estándares de accesibilidad
- **Performante**: Usa React hooks optimizados
- **TypeScript**: Completamente tipado
- **Material-UI**: Integrado con el sistema de diseño
