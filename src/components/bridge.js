import { LiFiWidget } from '@lifi/widget';


function Bridge() {
  return (
<LiFiWidget
      config={{
        containerStyle: {
          border: `2px solid #21273a `,
          borderRadius: '16px',
        },
        theme: {
          palette: {
            primary: { main: '#243056' },
            secondary: { main: '#FFFFFF' },
            background: { 
              paper: '#1f2639', // bg color for cards
              default: '#0e111b', // transparent , #0e111b
              },

          },
          
          shape: {
            borderRadius: '15px',
            
          },
          typography: {
            fontFamily: "Segoe UI" ,
            
          }
          },
          appearance: 'dark',
          hiddenUI: ['appearance'],
          variant: 'expandable',
          //subvariant: 'split',
      }}
      integrator="Sevo"
    />
  );
}



export default Bridge;