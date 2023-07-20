import { infoPane, title, subtitle, divider, poster, detail, footNotes } from "./info.module.css";

export default function Layout({ imdb: src }) {
  if (!src) {
    return <div></div>;
  }
  let naturalText1 = "";

  const {
    alias = "",
    // coutry,
    // createdAt,
    dateReleased,
    description,
    doubanId,
    doubanRating,
    doubanVotes,
    duration,
    episodes,
    genre,
    // id,
    // imdbId,
    imdbRating,
    imdbVotes,
    // lang,
    // langauge,
    // movie,
    name,
    originalName,
    poster: posterImg,
    // totalSeasons,
    type,
    // updatedAt,
    // year,
  } = src;

  if (duration && episodes === 1) {
    naturalText1 += `${duration} minutes `;
  }
  if (episodes && type !== "MOVIE") {
    naturalText1 += `${episodes} episode `;
  }
  // if (duration && episodes > 1) {
  //   naturalText1 += `${parseInt(duration / episodes)}-minute `;
  // }
  if (type) {
    naturalText1 += `${type} `;
  }
  naturalText1 += " Ultraman. ";

  let strStartDate = dateReleased ?? null;

  let strEndDate = null;

  let naturalText2 = "";
  if (strStartDate && strEndDate) {
    if (type === "MOVIE") {
      if (strStartDate === strEndDate) {
        naturalText2 += `Released on ${strStartDate}`;
      } else {
        naturalText2 += `Released during ${strStartDate} to ${strEndDate}`;
      }
    } else if (strStartDate === strEndDate) {
      naturalText2 += `Released on ${strStartDate}`;
    } else {
      naturalText2 += `Airing from ${strStartDate} to ${strEndDate}`;
    }
  } else if (strStartDate) {
    if (type === "TV" || type === "TV_SHORT" || type === "TVSeries") {
      naturalText2 += `Airing since ${strStartDate}`;
    } else {
      naturalText2 += `Released on ${strStartDate}`;
    }
  }

  naturalText2 += ". ";

  const synonyms = Array.from(
    new Set(
      [...alias.split("/")]
        .filter((e) => e)
        .sort()
        .map((title, i) => {
          return <div key={i}>{title}</div>;
        })
    )
  );

  const rating = Array(2)
    .fill(null)
    .map((_, i) => {
      if (i === 0) {
        return (
          <div key={i}>
            Douban: {doubanRating} ({doubanVotes} votes)
          </div>
        );
      } else {
        return (
          <div key={i}>
            IMDB: {imdbRating} ({imdbVotes} votes)
          </div>
        );
      }
    });

  return (
    <div className={infoPane}>
      <div className={title}>{name}</div>
      <div className={subtitle}>{originalName}</div>
      <div className={divider}></div>

      <div className={detail}>
        <table>
          <tbody>
            <tr>
              <td colSpan={2}>
                {naturalText1}
                <br />
                {naturalText2}
              </td>
            </tr>
            <tr>
              <td>Alias</td>
              <td>{synonyms}</td>
            </tr>
            <tr>
              <td>Genre</td>
              <td>{genre}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{description}</td>
            </tr>
            <tr>
              <td>Rating</td>
              <td>{rating}</td>
            </tr>
          </tbody>
        </table>
        <div className={poster}>
          <a href={`//movie.douban.com/subject/${doubanId}/`}>
            <img
              key={posterImg}
              src={posterImg}
              style={{ opacity: 0 }}
              onLoad={(e) => {
                e.target.style.opacity = 1;
              }}
            />
          </a>
        </div>
      </div>
      <div className={divider}></div>
      <div className={footNotes}>
        Information provided by <a href="https://douban.com">Douban.com</a>
      </div>
    </div>
  );
}
