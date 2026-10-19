import styles from './Screenshot.module.css';

// A real application screenshot in a quiet frame. Width and height are passed
// through so the browser reserves space and the layout does not shift.
export default function Screenshot({ image, loading = 'lazy', className = '' }) {
  return (
    <div className={`${styles.frame} ${className}`}>
      <img
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading={loading}
        decoding="async"
        className={styles.image}
      />
    </div>
  );
}
