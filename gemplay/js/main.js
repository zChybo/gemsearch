const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search gems.json and filter it
const searchGems = async searchText =>  {
    const res = await fetch('../data/gemz.json');
    const gems = await res.json();

// Get Matches to current text input
let matches = gems.filter(gem => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return gem.Page.match(regex);
});


if(searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
}
outputHtml(matches);

};

//Show Results in HTML
const outputHtml = matches => {
    if(matches.length > 0) {
      const html = matches.map(match => `
      <div class="card card-body mb-1">
      <h4>${match.Page}</h4> <em>(${match.gemdiscription})</em> <span class="text-primary">
      ${match.gemtags}</span><h3>${match.primaryattribute}</h3>
      </div>
      `).join('');
matchList.innerHTML = html;
    }       

    
};




search.addEventListener('input', () => searchGems(search.value));