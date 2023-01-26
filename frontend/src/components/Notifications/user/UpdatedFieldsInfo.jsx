import { useEffect, useState } from 'react';
import { setNotificationToRead } from '../../../apis/setNotificationToRead';

const UpdatedFieldsInfo = ({ targets, notifId, userId, read = 'notRead' }) => {
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    if (read === 'notRead')
      setNotificationToRead(userId, notifId).catch(console.error);
  }, [read, userId, notifId]);

  useEffect(() => {
    const tmp = [];

    for (const field of targets) {
      if (field?.from === field?.to) continue;
      if (typeof field.from === 'string' && field.name !== 'descriptions') {
        tmp.push({
          name: field.name,
          content: `was modified from ${field.from} to ${field.to}`,
        });
      }

      if (field.name === 'descriptions') {
        tmp.push({
          name: field.name,
          content: `was modified`,
        });
      }

      if (field?.name === 'pics_url' && Array.isArray(field.from)) {
        const lenTo = field.to.length;
        const lenFrom = field.from.length;
        if (lenFrom === lenTo) continue;
        if (lenTo > lenFrom) {
          tmp.push({
            name: field.name,
            content: `${lenTo - lenFrom} new image${
              lenTo - lenFrom > 1 ? 's' : ''
            } was added to it`,
          });
        } else {
          tmp.push({
            name: field.name,
            content: `${lenFrom - lenTo} image${
              lenFrom - lenTo > 1 ? 's' : ''
            } was removed from it`,
          });
        }
      }
      if (Array.isArray(field.from) && field.name !== 'pics_url') {
        tmp.push({
          name: field.name,
          content: `was modified ${
            field.from.length ? `from ${field.from.join(', ')}` : ''
          } to ${field.to.join(', ')}`,
        });
      }
      if (field.from.constructor.name === 'Object') {
        const characteristics = [];
        Object.keys(field.from).forEach((characteristic) => {
          if (field.from[characteristic] !== field.to[characteristic])
            characteristics.push(
              `- ${characteristic} was modified from ${field.from[characteristic]} to ${field.to[characteristic]}`
            );
        });
        tmp.push({ name: field.name, content: characteristics.join(' ') });
      }
    }
    setInfos(tmp);
    return () => setInfos([]);
  }, [targets]);

  if (!infos.length) return null;
  return infos.map((field, idx) => (
    <span key={idx}>
      <span className="text-orange-600">
        <br />- {field?.name !== 'pics_url' ? field?.name : ''}
      </span>
      &nbsp;
      {field.content}
    </span>
  ));
};

export default UpdatedFieldsInfo;
