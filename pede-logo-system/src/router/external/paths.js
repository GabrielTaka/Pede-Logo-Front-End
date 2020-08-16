/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/',
    // Relative to /src/views
    view: 'Login'
  },
  {
    path: '/admin/dashboard',
    // Relative to /src/views
    view: 'Dashboard'
  },
  {
    path: '/admin/products',
    name: 'Lista de Produtos',
    view: 'ProductsList'
  },
  {
    path: '/admin/products/new',
    name: 'Lista de Produtos',
    view: 'ProductsNew'
  },
  {
    path: '/admin/products/:id',
    name: 'edit_product',
    view: 'ProductsNew',
    props: true
  },
  {
    path: '/admin/establishments',
    name: 'Estabelecimento',
    view: 'EstablishmentsList'
  },
  {
    path: '/admin/establishments/new',
    name: 'Estabelecimento',
    view: 'EstablishmentsNew'
  },
  {
    path: '/admin/establishments/:id/edit',
    name: 'Estabelecimento',
    view: 'EstablishmentData',
    props: true
  },
  {
    path: '/admin/users',
    name: 'Usuários / Profissionais',
    view: 'UsersList'
  },
  {
    path: '/admin/users/new',
    name: 'Usuários / Profissionais',
    view: 'UsersNew'
  },
  {
    path: '/admin/users/:id/edit',
    name: 'Usuário / Profissional',
    view: 'UsersNew',
    props: true
  },
  {
    path: '/admin/categories',
    name: 'Categoria',
    view: 'CategoriesList'
  },
  {
    path: '/admin/categories/new',
    name: 'Categoria',
    view: 'CategoriesNew'
  },
  {
    path: '/admin/categories/:id/edit',
    name: 'Categoria',
    view: 'CategoriesNew',
    props: true
  },
  {
    path: '/admin/subCategories',
    name: 'SubCategorias',
    view: 'subCategories/SubCategoriesList',
    props: true
  },
  {
    path: '/admin/subcategories/new',
    name: 'Subcategorias',
    view: 'subCategories/SubCategoriesNew',
  },
  {
    path: '/admin/subcategories/:id/edit',
    name: 'Editar Subcategoria',
    view: 'subCategories/SubCategoriesNew',
    props: true
  },

]
