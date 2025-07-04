fetch('clientes.json', { cache: "no-store" })
  .then(resposta => resposta.json())
  .then(clientes => {
    console.log('Tipo:', typeof clientes);
    console.log('Conteúdo:', clientes);

    if (!Array.isArray(clientes)) {
      console.error('JSON recebido não é um array:', clientes);
      return;
    }

    const container = document.querySelector('.card-container');
    container.innerHTML = '';

    clientes.forEach(cliente => {
      const card = document.createElement('div');
      card.className = 'item';
      card.innerHTML = `
        <p><strong>🆔ID:</strong> ${cliente.id}</p>
        <p><strong>👤Nome:</strong> ${cliente.nome}</p>
        <p><strong>📧Email:</strong> ${cliente.email}</p>
        <p><strong>☎️Telefone:</strong> ${cliente.telefone}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(erro => console.error('Erro ao carregar JSON:', erro));
