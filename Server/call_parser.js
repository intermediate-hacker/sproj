$.ajax({
  type: "POST",
  url: "~/page_parser.py",
  data: { param: text}
}).done(function( o ) {
   console.log("code optimized!! yay :)")
});