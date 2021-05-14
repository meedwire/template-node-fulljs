import api from '../../../service/api';

async function fetchData() {
  const { data } = await api.get('random');

  return data;
}

async function fetchCategories(){
  const { data } = await api.get('categories');

  return data;
}

async function fetchDataCategory(category){
  const { data } = await api.get('random', {params: {category}});

  return data;
}

let Home = {
  is_private: false,

  render: async () => {
    const data = await fetchData();
    const categories = await fetchCategories()
    
    let view = `
          <div class="container" id="container">
            <div class="box_container" >
              <p class="header_text" >Selecione uma categoria:</p>
              <select id="category" >
                ${categories.map(item => `<option class="manu-item" >${item}</option>`).join('')}
              </select>
              <img class="icon" id="icon" src="https://i.pinimg.com/originals/21/b2/b3/21b2b3a69cbc45bf4c06330af28132aa.jpg">
              <h1 class="header_text" >Categoria:</h1>
              <p class="text" id="text" >${data.value}</p>
            </div>
          </div>
      `;

    return view;
  },

  after_render: async () => {
    const select = document.getElementById('category');

    select.addEventListener('change', async (e) => {
      console.log(e.target.value);
      const data = await fetchDataCategory(e.target.value);

      const headerText = document.getElementsByClassName('header_text')[0];

      const icon = document.getElementById('icon');
      const text = document.getElementById('text');


      console.log(data)

      if (data){
        headerText.innerText = `Categoria: ${e.target.value}`;
        icon.source = data.icon_url;
        text.innerText = data.value;
      }
    })
  },
};

export default Home;
