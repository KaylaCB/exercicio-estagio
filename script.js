
// O '{ cache: "no-store" }' garante que o navegador sempre pegue a versão mais recente do arquivo
fetch('clientes.json', { cache: "no-store" })
  .then(resposta => resposta.json())
  .then(clientes => {
    if (!Array.isArray(clientes)) {
      console.error('JSON recebido não é um array:', clientes);
      return; 
   }
    const container = document.querySelector('.card-container');
    // Limpa qualquer conteúdo HTML existente dentro do 'card-container'
    // Evita q dados antigos apareçam se o script for executado novamente
    container.innerHTML = '';
    const titulo = document.createElement('h2');
    titulo.textContent = 'Dados do Cliente';
    container.appendChild(titulo);

   
    const tabela = document.createElement('table');
    // Cria o cabeçalho da tabela (<thead>)
    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    ['ID', 'Nome', 'Email', 'Telefone'].forEach(texto => {
      const th = document.createElement('th'); 
      th.textContent = texto; // texto do cabeçalho
      trHead.appendChild(th);
    });
    thead.appendChild(trHead); 
    tabela.appendChild(thead); 
    const tbody = document.createElement('tbody');
    // lembrar 'index' é o número da posição do cliente no array (0, 1, 2...).
    clientes.forEach((cliente, index) => {
      const tr = document.createElement('tr'); 

      if (index % 2 === 0) {
        tr.classList.add('linha-par'); 
      } else {
        tr.classList.add('linha-impar'); 
      }

      [cliente.id, cliente.nome, cliente.email, cliente.telefone].forEach(valor => {
        const td = document.createElement('td'); 
        td.textContent = valor; 
        tr.appendChild(td); 
      });
      tbody.appendChild(tr); 
    });
    tabela.appendChild(tbody); 

    container.appendChild(tabela); 

    
    const footer = document.createElement('p');
    footer.classList.add('footer-text');
    footer.textContent = 'Feito por Kayla Caldas B';
    container.appendChild(footer);

  })
  // Para exibir qualquer erro que aconteça durante o uso do JSON
  .catch(erro => console.error('Erro ao carregar JSON:', erro));
