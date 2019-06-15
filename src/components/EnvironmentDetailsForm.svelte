<script>
  import { addEnvironment, closeFullScreenModal } from "../stores";
  export let environmentDetail = {
    name: "New environment",
    url: "https://www.bing.com",
    username: "username@domain.com",
    password: "123456",
    auth: "aad-basic"
  };

  async function onSubmit(e) {
    if (e.target.reportValidity()) {
      e.preventDefault();
      await addEnvironment(environmentDetail);
      closeFullScreenModal();
    }
  }
</script>

<form on:submit={onSubmit}>
  <div>
    <label for="name">Name</label>
    <input required id="name" type="text" bind:value={environmentDetail.name} />
  </div>
  <div>
    <label for="url">URL</label>
    <input required id="url" type="url" bind:value={environmentDetail.url} />
  </div>
  <div>
    <label for="username">Username</label>
    <input id="username" type="text" bind:value={environmentDetail.username} />
  </div>
  <div>
    <label for="password">Password</label>
    <input
      id="password"
      type="password"
      bind:value={environmentDetail.password} />
  </div>
  <div>
    Automate authentication
    <input
      id="auth-aad-basic"
      name="auth"
      type="radio"
      value="aad-basic"
      bind:group={environmentDetail.auth} />
    <label for="auth-aad-basic">AAD Username + password</label>
    <br />
    <input
      id="auth-manual"
      name="auth"
      type="radio"
      value="manual"
      bind:group={environmentDetail.auth} />
    <label for="auth-manual">Manual</label>
  </div>
  <button type="submit">Save</button>
</form>
