# kegg_to_mesh

API vs XML read? ---> 600mb in memory or stream read with look aheads?
http requests are slow but the search efford is left to the server

## Mesh Descriptor Record

Structure:
    Headings --- (also called "main headings" or "descriptors") represent concepts found in the biomedical literature.
    SubHeadings (also called qualifiers) are attached to MeSH headings to describe a specific aspect of a concept
    Supplementary Concept Records are terms in a separate thesaurus from the Medical Subject Headings.
    These are primarily substance terms, but also include some protocols, some virus terms and rare disease terms. These terms are updated daily.

MESH APIs

// tree info
https://meshb.nlm.nih.gov/api/tree/children/---> TREE IDENTIFIER <---

//descriptor details ---> terms <---
https://id.nlm.nih.gov/mesh/lookup/details?descriptor=---> DESCRIPTOR ID <---

MeSH headings are organized in a "tree" with 16 main branches:

A. Anatomy
B. Organisms
C. Diseases
D. Chemicals and Drugs
E. Analytical, Diagnostic and Therapeutic Techniques and Equipment
F. Psychiatry and Psychology
G. Phenomena and Processes
H. Disciplines and Occupations
I. Anthropology, Education, Sociology and Social Phenomena
J. Technology, Industry, Agriculture
K. Humanities
L. Information Science
M. Named Groups
N. Health Care
V. Publication Characteristics
Z. Geographicals

### TODO

get the descriptor json for each descriptor
find the descriptor label ---> check if it match environ
if yes
    get the descriptor details
    get the terms labels
    get the descriptor tree number
    get the children of the branch with that tree number
    check if they have children
    repeat till exausted
if no
    go to next descriptor

get descriptor details by descriptor id