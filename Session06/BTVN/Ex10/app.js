import getDataUser from "./apiService.js";

async function renderApp() {
  const users = await getDataUser();
  const str = users.map(({ name, email, website }) => {
    return `
        <div>
            <h4>${name}</h4>
            <p>Email: ${email}</p>
            <p>Website: ${website}</p>
        </div>
        `;
  });

  document.getElementById("container").innerHTML = str.join(" ");
}

renderApp();
