fetch('clientes.json', { cache: "no-store" })
  .then(resposta => resposta.json())
  .then(clientes => {
    if (!Array.isArray(clientes)) {
      console.error('JSON recebido não é um array:', clientes);
      return;
    }

    const container = document.querySelector('.card-container');
    container.innerHTML = ''; // limpa container

    // Cria a tabela
    const tabela = document.createElement('table');
    tabela.style.borderCollapse = 'collapse'; // para juntar as bordas

    // Cabeçalho
    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    ['ID', 'Nome', 'Email', 'Telefone'].forEach(texto => {
      const th = document.createElement('th');
      th.textContent = texto;
      th.style.border = '1px solid #000';
      th.style.padding = '8px';
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    tabela.appendChild(thead);

    // Corpo da tabela
    const tbody = document.createElement('tbody');
    clientes.forEach(cliente => {
      const tr = document.createElement('tr');
      [cliente.id, cliente.nome, cliente.email, cliente.telefone].forEach(valor => {
        const td = document.createElement('td');
        td.textContent = valor;
        td.style.border = '1px solid #000';
        td.style.padding = '8px';
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    tabela.appendChild(tbody);

    container.appendChild(tabela);
  })
  .catch(erro => console.error('Erro ao carregar JSON:', erro));
