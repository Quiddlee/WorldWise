export default function FlagemojiToSVG({ emoji }) {
  const countryCode = Array.from(emoji, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join('');
  return (
    <img
      src={`https://flagcdn.com/${countryCode}.svg`}
      alt="flag"
      height={20}
    />
  );
}
