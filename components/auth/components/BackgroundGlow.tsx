function BackgroundGlow() {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-purple-600/20 blur-[120px]" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-600/20 blur-[120px]" />
    </div>
  );
}

export default BackgroundGlow;
