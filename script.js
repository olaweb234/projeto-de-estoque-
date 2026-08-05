let listajs=[]
let idjs=1
let receita2=0
let ideditado=null
const envio_formulario=document.getElementById('formulario')
const nome=document.getElementById('nome') 
const categoria=document.getElementById('categoria')
const preco=document.getElementById('preco')
const quantidade=document.getElementById('quantidade')
const btnbuscar=document.getElementById('btn-buscar')
const btnpreco=document.getElementById('ordenar-preco')
const btnquantidade=document.getElementById('ordenar-quantidade')
const btnome=document.getElementById('ordenar-nome')
const listahtml=document.getElementById('listahtml')
const alertas=document.getElementById('alertas')
const limpar=document.getElementById('limpar')
const mostrartudo=document.getElementById('mostrartudo')



mostrartudo.addEventListener('click',function(){
    renderizarlista()
})

limpar.addEventListener('click',function(){
      if(confirm('tem certeza?')){
        listajs=[]
        idjs=1
        salvarnolocalstorage()
        renderizarlista()
        limparcampos()
        }
})

btnpreco.addEventListener('click',function(){
    const ordenadopreco=[...listajs].sort((a,b)=>a.preco -b.preco)
    renderizarlista(ordenadopreco)
})
btnome.addEventListener('click',function(){
    const ordenarnome=[...listajs].sort((a,b)=>a.nome.localeCompare(b.nome))
    renderizarlista(ordenarnome)
})

btnquantidade.addEventListener('click',function(){
    const ordenarquantidade=[...listajs].sort((a,b)=>a.quantidade-b.quantidade)
    renderizarlista(ordenarquantidade)
})

btnbuscar.addEventListener('click',function(){
    const buscar=document.getElementById('buscar').value.trim().toLowerCase()


    if(buscar===''){
        alertas.innerHTML='Digite algo no campo buscar'
        return
    }
    const resultados=listajs.filter(item=>item.nome.toLowerCase().includes(buscar)||item.categoria.toLowerCase().includes(buscar))
    renderizarlista(resultados)
})


function salvarnolocalstorage(){
    localStorage.setItem('estoque',JSON.stringify(listajs))
}

const dadossalvos=localStorage.getItem('estoque')
if(dadossalvos){
    listajs=JSON.parse(dadossalvos)
    if(listajs.length>0){
        const ultmoid=listajs[listajs.length-1].id
        idjs=ultmoid+1
    }
    renderizarlista()
}

function atualizarestatisticas(){
    receita2=0
    const quantidadegeral=document.getElementById('total-geral')
    const receita=document.getElementById('total-receitas')
    const produtomaiscar=document.getElementById("produto_maiscaro")
    const produto_maisbarato=document.getElementById("produto_maisbarato")
    const produto_menor=document.getElementById('produto_menor')   
    if (listajs.length === 0) {
    quantidadegeral.innerText = 0
    receita.innerText = 'R$ 0,00'
    produtomaiscar.innerText = 'Nenhum produto'
    produto_maisbarato.innerText = 'Nenhum produto'
    produto_menor.innerText = 'Nenhum produto'
  
  
  return
}
const total=listajs.reduce(function(soma,produto){
    return soma+ produto.quantidade
},0)
    listajs.forEach(produto=>{
        receita2+=(produto.preco * produto.quantidade)
    })   
    const receitaconvertida=receita2.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    const produtos2=listajs.map(produto=>produto.preco)
    const produto_menor2=listajs.map(produto=>produto.quantidade)
    
    const mairpreco= Math.max(...produtos2)
    const menorpreco=Math.min(...produtos2)
    receita.innerText=receitaconvertida
    quantidadegeral.innerText=total
    produto_maisbarato.innerText=menorpreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    produtomaiscar.innerText=mairpreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    produto_menor.innerText=Math.min(...produto_menor2)
}



function renderizarlista(arraypararenderizar=listajs){
    listahtml.innerHTML=''
   
   arraypararenderizar.forEach(function(produto){
    const valorconvertido=produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    const li=document.createElement('li')
    if(produto.quantidade<5){
        li.classList.add('estoque-baixo')
        
    }
    const btnexcluir=document.createElement('button')
    const idparaexcluir=produto.id
    btnexcluir.innerText='🗑️'
    btnexcluir.addEventListener('click',function(){
        if(confirm('tem certeza?')){
            listajs=listajs.filter(produto=>produto.id !==idparaexcluir)
            renderizarlista()
            salvarnolocalstorage()
        }
    })
    const bteditar=document.createElement('button')
    bteditar.innerText='editar'
    bteditar.addEventListener('click',function(){
         ideditado=produto.id
       nome.value=produto.nome
       categoria.value=produto.categoria
       preco.value=produto.preco
       quantidade.value=produto.quantidade
       const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    btnSubmit.innerText = 'Salvar Edição'
    })
     li.innerHTML= `nome do produto: ${produto.nome}
        categoria do produto:${produto.categoria}
        preço do produto : ${valorconvertido}
        quantidade do produto: ${produto.quantidade}

    `
    li.appendChild(bteditar)
    li.appendChild(btnexcluir)
    listahtml.appendChild(li)
   })
   atualizarestatisticas()

}


function validacaodoscampos(){
    if(nome.value===''|| categoria.value==='' || preco.value ===''|| quantidade.value===''){
        alertas.innerHTML='Os campos devem ser preenchido'
        return false
    }
   
    const precoconvertido=parseFloat(preco.value)
    const quantidadeconvertida=parseInt(quantidade.value)
    if(isNaN(precoconvertido)|| isNaN(quantidadeconvertida)|| precoconvertido<0 || quantidadeconvertida<0){
       alertas.innerHTML='Os campos devem ser preenchidos e tem que ser um valor valido'
        return false
      } 
    const produtorepetido = listajs.some(produto => 
    produto.id !== ideditado && produto.nome.toLowerCase() === nome.value.toLowerCase()
    )
    if(produtorepetido){
        alertas.innerText='Já existe esse produto'
        return false
    }
      return true
   
}

function limparcampos(){
    nome.value=''
    categoria.value=''
    preco.value=''
    quantidade.value=''
}

envio_formulario.addEventListener('submit',function(){
    event.preventDefault()
    const precoconvertido=parseFloat(preco.value)
    const quantidadeconvertida=parseInt(quantidade.value)
    if(!validacaodoscampos()){
        return
    }
    if (ideditado !== null) {
   
    const produto = listajs.find(p => p.id === ideditado)
    produto.nome = nome.value
    produto.categoria = categoria.value
    produto.preco = precoconvertido
    produto.quantidade = quantidadeconvertida
    ideditado = null
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    btnSubmit.innerText = 'Cadastrar'
} else {
    const objetoestoque={
        id:idjs,
        nome:nome.value,
        categoria:categoria.value,
        preco:precoconvertido,
        quantidade:quantidadeconvertida
    }
    idjs++
    listajs.push(objetoestoque)
    
}   
    limparcampos()
    renderizarlista()
    salvarnolocalstorage()
})