export type TypeEmployees = {
    name: string
    rg: string
    cpf: string
    email: string
    phone: string
    password: string
    address: {
      id: any;
      street: string
      number: string
      complement: string
      neighborhood: string
      city: string
      state: string
      zipCode: string
    }
    hotel_id: string
  };
  
  export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  }