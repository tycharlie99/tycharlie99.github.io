interface Props {
  date: Date;
  format?: 'short' | 'long' | 'relative';
}

export default function DateFormatter({ date, format = 'short' }: Props) {
  if (!date) return null;

  const isoString = date.toISOString();

  if (format === 'short') {
    return (
      <time dateTime={isoString} className="font-mono">
        {date.toLocaleDateString('en', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
      </time>
    );
  }

  return (
    <time dateTime={isoString}>
      {date.toLocaleDateString('en', {
        dateStyle: 'long'
      })}
    </time>
  );
}
