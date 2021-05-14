import api from '../../../service/api';

async function fetchData() {
  const { data } = await api.get('random');

  return data;
}

async function fetchCategories(){
  const { data } = await api.get('categories');

  return data;
}

let Home = {
  is_private: false,

  render: async () => {
    const data = await fetchData();
    const categories = await fetchCategories()

    console.log(categories.join(''))
    
    let view = `
          <div id="container">
            <select>
              ${categories.map(item => `<option class="manu-item" >${item}</option>`).join('')}
            </select>
            <img src=${data.icon_url}>
            <h1>Home</h1>
            <p>${data.value}</p>
          </div>
      `;

    return view;
  },

  after_render: async () => {
  
  },
};

export default Home;
