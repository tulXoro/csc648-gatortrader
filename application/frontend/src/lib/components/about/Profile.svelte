<script>
    export let name = "";
    export let photo = "";
    export let bio = "";
    export let role = "";
</script>

<main>
<div class="container center">
    <h1>About Us</h1>
    <div class="row">
        <div class="col-md-6">
            <img src={photo} alt={name} class="img-fluid" />
        </div>
        <div class="col-md-6">
            <h2>{name}</h2>
            <h3>{role}</h3>
            <p>{bio}</p>
        </div>
    </div>
</div>
</main>