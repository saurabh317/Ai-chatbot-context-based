type LoadingProps = {
  size?: number;
};

const Loading = ({ size = 24 }: LoadingProps) => {
  return (
    <div className="flex justify-center items-center py-2">
      <div
        className="animate-spin rounded-full border-2 border-zinc-600 border-t-white"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    </div>
  );
};

export default Loading;
