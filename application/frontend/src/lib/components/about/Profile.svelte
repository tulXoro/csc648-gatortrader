<script>
    import default_profile from "$lib/assets/default_profile.jpg";

    export let name = "";
    export let photo = default_profile;
    export let bio = "";
    export let role = "";
    export let github = "";
    export let linkedin = "";
    export let email = "";
</script>

<main>
<div class="container center">
    <h1>About Us</h1>
    <div class="row">
        <div class="col-md-6">
            <img src={photo} alt={name} class="img-fluid" />
        </div>
        {#if github || linkedin || email}
        <ul class="flex row-auto">
            {#if github}
                <li><a href={github} target="_blank" rel="noopener noreferrer">Github</a></li>
            {/if}
            {#if linkedin}
                <li><a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            {/if}
            {#if email}
                <li><a href={"mailto:" + email} target="_blank" rel="noopener noreferrer">Email</a></li>
            {/if}
        </ul>
        {/if}
        <div class="col-md-6">
            <h2>{name}</h2>

            <h3>{role}</h3>
            <p>{bio}</p>
        </div>
    </div>
</div>
</main>