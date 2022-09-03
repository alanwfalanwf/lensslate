MANIFESTS = \
  index.html \
  add.html \
  COPYING-GPL.txt \
  COPYING-GFDL.txt \
  development.html \
  faq.html \
  help.html \
  manual.html \
  news.html \
  app.html \
  app.css \
  app.js \
  jquery-3.6.1.min.js \
  style.css \
  icon.png \
  icons/arrow-left-100.png \
  icons/arrow-right-100.png \
  icons/upload-100.png \
  images/lightroom-example.png \
  images/main-screen.png \
  images/more-screen.png \
  images/sync-screen.png \
  images/add-adapter-screen-example.png \
  images/add-adapter-screen.png \
  images/add-lens-screen-example-canon-new-fd50mm.png \
  images/add-lens-screen-example-canon-new-fd35-105mm.png \
  images/add-lens-screen-example-voigtlaender-42.5mm.png \
  images/add-lens-screen.png
INSTALLS  = $(MANIFESTS) .htaccess app.manifest
CLEANS    = .htaccess app.manifest index.html about.html add.html faq.html help.html manual.html news.html FILES

all: $(INSTALLS)

install:
	@echo "########################################################################"
	@echo "ERROR: use make install-release or make install-test".
	@echo "########################################################################"
	@echo 1

install-test:
	make install-with-prefix PREFIX="lensslate-test" 

install-release:
	make install-with-prefix PREFIX="lensslate" 
	
install-with-prefix: all FILES
	@test ! -z "$(PREFIX)" || (echo "ERROR: PREFIX is not set." && exit 1)
	@echo "########################################################################"
	@echo "# Installing to PREFIX \"$(PREFIX)\"".
	@echo "########################################################################"
	rsync -vp --files-from=FILES --delete ./ alanwf.com:alanwf.com/$(PREFIX)/
	@echo "########################################################################"
	
index.html: index.md HEADER.md FOOTER.md
add.html: add.md HEADER.md FOOTER.md
about.html: about.md HEADER.md FOOTER.md
deleting.html: deleting.md HEADER.md FOOTER.md
development.html: development.md HEADER.md FOOTER.md
faq.html: faq.md HEADER.md FOOTER.md
help.html: help.md HEADER.md FOOTER.md
installing.html: installing.md HEADER.md FOOTER.md
using.html: using.md HEADER.md FOOTER.md
news.html: news.md HEADER.md FOOTER.md

clean:
	rm -f $(CLEANS)
	
.htaccess: htaccess
	echo "# This file is generated automatically from htaccess." >.htaccess
	cat htaccess >>.htaccess

app.manifest: Makefile $(MANIFESTS)
	./tools/make-manifest $(MANIFESTS) >app.manifest

FILES: Makefile
	for file in $(INSTALLS); do echo $$file; done >FILES

.SUFFIXES		:	.md	
.SUFFIXES		:	.html
.md.html		:
	./tools/make-html $*.md

