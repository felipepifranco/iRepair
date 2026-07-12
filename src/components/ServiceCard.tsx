interface ServiceCardProp {
  nomeCliente : string;
  aparelho : string;
  defeito: string;
  dataChegou? : Date;
  dataEntrega? : Date;
}

export function ServiceCard({nomeCliente, aparelho, defeito, dataChegou, dataEntrega} : ServiceCardProp){
  nomeCliente ;
  return (
    <>
      <h2>{nomeCliente}</h2>
      <h2>{aparelho}</h2>
      <p>{defeito}</p>
      <footer>
      </footer>
    </>
  );
}