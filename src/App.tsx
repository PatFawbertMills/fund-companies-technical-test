import { useFundCompanies } from "./fundCompanies/useFundCompanies";

import { toPercent } from "./utility/toPercent";

function App() {
  // Fund name could be made into component state quite easily if we wanted to make it interactive
  const fund = "Ethical Global Fund";
  const companies = useFundCompanies(fund);
  companies.sort((a, b) => {
    return b.weight - a.weight;
  });

  // Design wise - I've just gone for something incredibly simple and functional
  // In any normal scenario I would separate the company into its own component and use something like styled-components to manage props
  return (
    <div className="wrapper">
      <h1>{fund}</h1>
      <section>
        {companies.length
          ? companies.map((company) => {
              const weight = toPercent(company.weight) + "%";
              return (
                <div className="company" key={company.name}>
                  <p>
                    {company.name} - {weight}
                  </p>
                  <div className="companyChart">
                    <div className="companyBar" style={{ width: weight }}></div>
                  </div>
                </div>
              );
            })
          : "Sorry, no holdings found for that fund"}
      </section>
    </div>
  );
}

export default App;
