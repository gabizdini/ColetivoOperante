import * as prismic from 'https://cdn.skypack.dev/@prismicio/client'


const repositoryName = 'coletivooperante'
const client = prismic.createClient(repositoryName)

const init = async () => {
  const response = await client.getAllByType('post', {
    orderings: 'my.post.date desc',
    page: 1,
    pageSize: 5,
  })

  const posts = response.map(({ uid, data: post }) => {
    return {
      id: uid,
      title: prismic.asText(post.title),
      description: prismic.asText(post.description),
      date: new Date(post.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      thumbnail: post.thumbnail.url,
    }
  })

  posts.forEach(post => {
    const postAsHtml = `
        <article class="article-card">
          <div class="article-image">
            <img src="${post.thumbnail}" alt="Design Systems">
          </div>
          <div class="article-content">
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <div class="article-footer">
              <div class="article-date">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>${post.date}</span>
              </div>
            </div>
          </div>
        </article>
    `

    document.querySelector('.articles-grid').innerHTML += postAsHtml;
  })
}

init()